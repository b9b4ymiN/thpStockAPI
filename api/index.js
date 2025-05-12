const express = require("express");
const { getValuation, getWaccAndRoicV3 } = require("stock-snapshot");
const fs = require("fs")
const { execSync } = require("child_process")

const app = express();
const port = process.env.PORT || 3000;

app.get("/fs", async (req, res) => {
  try {
    let chromePath = null;

    // ลองเช็ค path ของ chrome ด้วย which
    try {
      chromePath = execSync("which google-chrome").toString().trim();
    } catch (e) {
      // ไม่พบจาก which
    }

    // fallback หากยังไม่เจอ ลอง path ทั่วไป
    const fallbackPaths = [
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/opt/google/chrome/chrome"
    ];

    if (!chromePath || !fs.existsSync(chromePath)) {
      for (const path of fallbackPaths) {
        if (fs.existsSync(path)) {
          chromePath = path;
          break;
        }
      }
    }

    if (chromePath && fs.existsSync(chromePath)) {
      res.json({ googlePathCheck: true, path: chromePath });
    } else {
      res.json({ googlePathCheck: false });
    }

  } catch (err) {
    res.status(500).json({ error: "ดึงข้อมูลไม่ได้", detail: err.message });
  }
});

app.get("/valuation/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase(); // เช่น "PTT"

  try {
    //period = Quarterly , TTM , Annual
    //StatementType = Balance Sheet , Cash Flow, Income,Ratios

    const snapshot = await getValuation(symbol);
    res.json(snapshot);
  } catch (err) {
    res.status(500).json({ error: "ดึงข้อมูลไม่ได้", detail: err.message });
  }
});

app.get("/wacc/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase(); // เช่น "PTT"

  try {
    //period = Quarterly , TTM , Annual
    //StatementType = Balance Sheet , Cash Flow, Income,Ratios

    const snapshot = await getWaccAndRoicV3(symbol);
    res.json(snapshot);
  } catch (err) {
    res.status(500).json({ error: "ดึงข้อมูลไม่ได้", detail: err.message });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Stock Snapshot API is live 🚀",
    currectTime: new Date().toString(),
    //git: await gitInfo.getGitCommit(),
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});