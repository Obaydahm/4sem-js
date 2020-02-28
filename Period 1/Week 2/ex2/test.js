const DosDetectorClass = require("./dosDetector");
const DosDetector = new DosDetectorClass.DosDectector(2000)

DosDetector.on("DosDetected", arg => {
  console.log("Dos attack detected:", arg)
})

DosDetector.addUrl("a")
DosDetector.addUrl("b")
setTimeout(() => {
  DosDetector.addUrl("a")
}, 1500);