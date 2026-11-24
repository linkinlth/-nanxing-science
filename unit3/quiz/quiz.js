(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function nl(s) {
    return esc(s).replace(/\n/g, "<br>");
  }

  function todayTW() {
    return new Intl.DateTimeFormat("zh-TW", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date());
  }

  function optionText(q, key) {
    if (!key || !q.options || !q.options[key]) return key || "（未作答）";
    return key + ". " + q.options[key];
  }

  function getQuizId() {
    if (window.QUIZ_ID) return window.QUIZ_ID;
    var params = new URLSearchParams(location.search);
    return params.get("id") || "";
  }

  function $(id) {
    return document.getElementById(id);
  }

  var quizId = getQuizId();
  var quiz = (window.QUIZZES || {})[quizId];
  if (!quiz) {
    document.body.innerHTML =
      '<div class="wrap"><div class="hero"><h1>找不到這份檢核</h1>' +
      '<p>請從 <a href="index.html">課後檢核目錄</a> 進入。</p></div></div>';
    return;
  }

  document.title = quiz.activity + " · 課後檢核";

  var choiceQs = quiz.questions.filter(function (q) { return q.type === "choice"; });
  var shortQs = quiz.questions.filter(function (q) { return q.type === "short"; });
  var choiceMax = choiceQs.length * quiz.choicePoints;
  var shortMax = shortQs.length * quiz.shortPoints;

  function renderForm() {
    var qHtml = quiz.questions.map(function (q) {
      if (q.type === "short") {
        return (
          '<section class="card q-card" id="qbox-' + q.no + '">' +
            '<div class="q-head">' +
              '<span class="q-no">' + q.no + "</span>" +
              '<span class="q-type">' + esc(q.typeLabel) + "（" + quiz.shortPoints + " 分，老師批改）</span>" +
              '<span class="q-focus">' + esc(q.focus) + "</span>" +
            "</div>" +
            '<div class="stem">' + esc(q.stem) + "</div>" +
            '<label class="field" for="ans-' + q.no + '">我的回答' +
              '<textarea id="ans-' + q.no + '" name="q' + q.no + '" rows="5" required placeholder="請寫下你的想法……"></textarea>' +
            "</label>" +
            '<div class="feedback info" id="fb-' + q.no + '"></div>' +
          "</section>"
        );
      }
      var opts = Object.keys(q.options).map(function (k) {
        var oid = "q" + q.no + "-" + k;
        return (
          '<label class="opt" for="' + oid + '">' +
            '<input type="radio" name="q' + q.no + '" id="' + oid + '" value="' + k + '">' +
            '<span class="key">' + k + "</span>" +
            "<span>" + esc(q.options[k]) + "</span>" +
          "</label>"
        );
      }).join("");
      return (
        '<section class="card q-card" id="qbox-' + q.no + '">' +
          '<div class="q-head">' +
            '<span class="q-no">' + q.no + "</span>" +
            '<span class="q-type">' + esc(q.typeLabel) + "（" + quiz.choicePoints + " 分）</span>" +
            '<span class="q-focus">' + esc(q.focus) + "</span>" +
          "</div>" +
          '<div class="stem">' + esc(q.stem) + "</div>" +
          '<div class="options" role="radiogroup" aria-label="第' + q.no + '題選項">' + opts + "</div>" +
          '<div class="feedback" id="fb-' + q.no + '"></div>' +
        "</section>"
      );
    }).join("");

    $("app").innerHTML =
      '<div class="hero">' +
        '<span class="badge">' + esc(quiz.unit) + " · 南一 · 六年級</span>" +
        "<h1>" + esc(quiz.activity) + "</h1>" +
        "<p>上完課後來檢查看看會不會。先填座號和姓名，再作答。選擇題每題 " +
        quiz.choicePoints + " 分（共 " + choiceMax + " 分），簡答題 " + shortMax +
        " 分由老師批改，滿分 100 分。</p>" +
        '<p class="hint">課本頁碼：' + esc(quiz.pages) + "</p>" +
      "</div>" +
      '<form id="quizForm" autocomplete="off" novalidate>' +
        '<div class="card">' +
          "<h2 style=\"margin:0 0 12px;color:var(--deep);font-size:20px\">先寫下你是誰</h2>" +
          '<div class="student-grid">' +
            '<label class="field">座號' +
              '<input type="number" id="seat" name="seat" min="1" max="50" required inputmode="numeric" placeholder="例：12">' +
            "</label>" +
            '<label class="field">姓名' +
              '<input type="text" id="sname" name="sname" required maxlength="20" placeholder="請輸入姓名">' +
            "</label>" +
          "</div>" +
        "</div>" +
        qHtml +
        '<div class="alert" id="formAlert" role="alert"></div>' +
        '<div class="btn-row">' +
          '<button type="submit" class="btn-ok" id="submitBtn">送出檢核</button>' +
        "</div>" +
      "</form>" +
      '<div id="resultBox" hidden></div>' +
      '<div id="printSheet" aria-hidden="true"></div>';

    var form = $("quizForm");
    form.addEventListener("change", function (e) {
      var t = e.target;
      if (t && t.type === "radio") {
        var group = t.closest(".options");
        if (!group) return;
        group.querySelectorAll(".opt").forEach(function (el) { el.classList.remove("selected"); });
        if (t.closest(".opt")) t.closest(".opt").classList.add("selected");
      }
    });
    form.addEventListener("submit", onSubmit);
  }

  function getSeatName() {
    return {
      seat: ($("seat").value || "").trim(),
      name: ($("sname").value || "").trim()
    };
  }

  function collect() {
    var answers = {};
    var missing = [];
    quiz.questions.forEach(function (q) {
      if (q.type === "short") {
        var text = ($("ans-" + q.no).value || "").trim();
        answers[q.no] = text;
        if (!text) missing.push(q.no);
      } else {
        var picked = document.querySelector('input[name="q' + q.no + '"]:checked');
        answers[q.no] = picked ? picked.value : "";
        if (!picked) missing.push(q.no);
      }
    });
    return { answers: answers, missing: missing };
  }

  function onSubmit(e) {
    e.preventDefault();
    var info = getSeatName();
    var alertEl = $("formAlert");
    if (!info.seat || !info.name) {
      alertEl.textContent = "請先填寫座號和姓名。";
      alertEl.classList.add("show");
      $("seat").focus();
      return;
    }
    var data = collect();
    if (data.missing.length) {
      alertEl.textContent = "還有題目還沒作答：第 " + data.missing.join("、") + " 題。";
      alertEl.classList.add("show");
      var first = $("qbox-" + data.missing[0]);
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    alertEl.classList.remove("show");
    grade(info, data.answers);
  }

  function grade(info, answers) {
    var correctCount = 0;
    var wrong = [];
    quiz.questions.forEach(function (q) {
      var ans = answers[q.no];
      if (q.type === "choice") {
        var ok = ans === q.answer;
        if (ok) correctCount += 1;
        else wrong.push(q.no);
        markChoice(q, ans, ok);
      } else {
        markShort(q, ans);
      }
    });
    var choiceScore = correctCount * quiz.choicePoints;
    lockForm();
    renderResult(info, answers, choiceScore, wrong);
    buildPrintSheet(info, answers, choiceScore, wrong);
    $("resultBox").hidden = false;
    $("resultBox").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function markChoice(q, ans, ok) {
    var box = $("qbox-" + q.no);
    box.classList.add("locked");
    box.querySelectorAll("input").forEach(function (inp) { inp.disabled = true; });
    box.querySelectorAll(".opt").forEach(function (el) {
      var inp = el.querySelector("input");
      if (!inp) return;
      if (inp.value === q.answer) el.classList.add(ok ? "right" : "miss");
      else if (inp.value === ans) el.classList.add("wrong");
    });
    var fb = $("fb-" + q.no);
    if (ok) {
      fb.className = "feedback show ok";
      fb.innerHTML = "答對了！";
    } else {
      fb.className = "feedback show bad";
      fb.innerHTML =
        "這一題再想想看。<br>你的作答：" + esc(optionText(q, ans) || "（未作答）") +
        "<br>正確答案：" + esc(optionText(q, q.answer)) +
        "<br>觀念說明：" + esc(q.explain);
    }
  }

  function markShort(q, ans) {
    $("ans-" + q.no).disabled = true;
    var fb = $("fb-" + q.no);
    fb.className = "feedback show info";
    fb.innerHTML =
      "簡答題請對照評分標準自己檢查，老師之後會批改（" + quiz.shortPoints + " 分）。" +
      "<br><strong>你的作答：</strong>" + nl(ans) +
      "<br><strong>評分標準：</strong><br>" + nl(q.rubric) +
      "<br><strong>觀念說明：</strong>" + esc(q.explain);
  }

  function lockForm() {
    $("seat").disabled = true;
    $("sname").disabled = true;
    $("submitBtn").disabled = true;
    $("submitBtn").textContent = "已送出";
  }

  function renderResult(info, answers, choiceScore, wrong) {
    var wrongText = wrong.length
      ? "選擇題需要再訂正：第 " + wrong.join("、") + " 題。錯題已標出正確答案和觀念說明。"
      : "選擇題全部答對，太棒了！請再對照簡答題的評分標準，做自我檢核。";
    $("resultBox").innerHTML =
      '<div class="hero score-box">' +
        "<h2 style=\"margin:0 0 8px;color:var(--deep)\">檢核結果</h2>" +
        "<p>" + esc(info.seat) + " 號　" + esc(info.name) + "</p>" +
        '<div class="num">' + choiceScore + " / " + choiceMax + "</div>" +
        "<p>選擇題得分（自動計分）</p>" +
        "<p>簡答題 " + shortMax + " 分：待老師批改</p>" +
        '<p class="hint">' + esc(wrongText) + "</p>" +
        '<p class="hint">訂正單建議以 B4 直式列印（A4 也可以），文字都不小於 12 點。</p>' +
        '<div class="btn-row">' +
          '<button type="button" class="btn-primary" id="printBtn">列印訂正單</button>' +
          '<button type="button" class="btn-ghost" id="retryBtn">再做一次</button>' +
          '<a class="btn btn-ghost" href="index.html">回檢核目錄</a>' +
        "</div>" +
      "</div>";
    $("printBtn").addEventListener("click", function () { window.print(); });
    $("retryBtn").addEventListener("click", function () { location.reload(); });
  }

  function buildPrintSheet(info, answers, choiceScore, wrong) {
    var items = "";
    if (wrong.length) {
      wrong.forEach(function (no) {
        var q = quiz.questions.filter(function (x) { return x.no === no; })[0];
        items +=
          '<div class="item">' +
            "<p><strong>第 " + q.no + " 題（" + esc(q.typeLabel) + "）</strong></p>" +
            "<p>" + esc(q.stem) + "</p>" +
            "<p>你的作答：" + esc(optionText(q, answers[q.no]) || "（未作答）") + "</p>" +
            "<p>正確答案：" + esc(optionText(q, q.answer)) + "</p>" +
            "<p>觀念說明：" + esc(q.explain) + "</p>" +
            "<p>我的訂正：</p>" +
            '<div class="blank"></div><div class="blank"></div>' +
          "</div>";
      });
    } else {
      items = "<p>選擇題全部答對，不必訂正選擇題。請再看簡答題的評分標準，把答案寫得更完整。</p>";
    }

    var shortHtml = shortQs.map(function (q) {
      return (
        '<div class="item">' +
          "<p><strong>第 " + q.no + " 題（簡答題，待老師批改）</strong></p>" +
          "<p>" + esc(q.stem) + "</p>" +
          "<p>你的作答：" + nl(answers[q.no]) + "</p>" +
          "<p>評分標準：<br>" + nl(q.rubric) + "</p>" +
          "<p>觀念說明：" + esc(q.explain) + "</p>" +
          "<p>我可以寫得更完整的地方：</p>" +
          '<div class="blank"></div><div class="blank"></div>' +
        "</div>"
      );
    }).join("");

    var focuses = quiz.focuses.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");

    $("printSheet").innerHTML =
      "<h1>六甲自然　" + esc(quiz.unit) + "　課後檢核訂正單</h1>" +
      "<table class='meta'>" +
        "<tr><td>活動：" + esc(quiz.activity) + "</td><td>課本：" + esc(quiz.pages) + "</td></tr>" +
        "<tr><td>座號：" + esc(info.seat) + "</td><td>姓名：" + esc(info.name) + "</td><td>日期：" + esc(todayTW()) + "</td></tr>" +
        "<tr><td>選擇題：" + choiceScore + " / " + choiceMax + " 分</td><td>簡答題：待老師批改（" + shortMax + " 分）</td></tr>" +
      "</table>" +
      "<h2>需要訂正的選擇題</h2>" + items +
      "<h2>簡答題自我檢核</h2>" + shortHtml +
      "<h2>本週學習重點</h2><ul>" + focuses + "</ul>" +
      "<h2>給家長的話</h2><p>" + esc(quiz.parentNote) + "</p>" +
      '<div class="sign"><div class="line">家長簽名：</div><div class="line">日期：</div></div>';
  }

  renderForm();
})();
