// بيانات الخواص الميكانيكية للصلب
const steelProperties = {
  ST37: { sigma_y: 240, E: 210000 },
  ST44: { sigma_y: 270, E: 220000 },
  ST52: { sigma_y: 360, E: 230000 },
};

// تحويل البوصة إلى مم
function inchToMm(inch) {
  return inch * 25.4;
}

// حساب مساحة مقطع ماسورة اسطوانية (مم²)
function calcArea(diameterInch, thicknessMm) {
  const rOuter = inchToMm(diameterInch) / 2;
  const rInner = rOuter - thicknessMm;
  return Math.PI * (rOuter ** 2 - rInner ** 2);
}

// حساب عزم القصور الذاتي (I) لمقطع ماسورة (مم⁴)
function calcMomentOfInertia(diameterInch, thicknessMm) {
  const rOuter = inchToMm(diameterInch) / 2;
  const rInner = rOuter - thicknessMm;
  return (Math.PI / 4) * (rOuter ** 4 - rInner ** 4);
}

// حساب قوة الشد أو الضغط الممكن تحملها (نيوتن)
function calcLoadCapacity(area, sigma_y) {
  return area * sigma_y; // MPa * mm² = N (نيوتن)
}

// حساب قوة الانبعاج (نيوتن)
function calcBucklingLoad(E, I, lengthMm, K = 0.5) {
  const L_eff = K * lengthMm;
  return (Math.PI ** 2 * E * I) / (L_eff ** 2);
}

document.getElementById('calculateBtn').addEventListener('click', () => {
  const d = parseFloat(document.getElementById('diameter').value);
  const t = parseFloat(document.getElementById('thickness').value);
  const steel = document.getElementById('steel').value;
  const length = parseFloat(document.getElementById('length').value);

  if (isNaN(d) || isNaN(t) || isNaN(length) || d <= 0 || t <= 0 || length <= 0) {
    alert('من فضلك أدخل قيم صحيحة لجميع الحقول');
    return;
  }

  const { sigma_y, E } = steelProperties[steel];
  const area = calcArea(d, t);
  const I = calcMomentOfInertia(d, t);
  const loadCapacity = calcLoadCapacity(area, sigma_y);
  const bucklingLoad = calcBucklingLoad(E, I, length);

  // عرض النتائج
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <p>مساحة مقطع الماسورة: ${area.toFixed(2)} مم²</p>
    <p>قوة الشد أو الضغط الممكن تحملها (Load Capacity): ${loadCapacity.toFixed(2)} نيوتن</p>
    <p>قوة الانبعاج الحرج (Buckling Load): ${bucklingLoad.toFixed(2)} نيوتن</p>
  `;
});
