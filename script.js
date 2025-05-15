const pipesData = [
  { diameter: 6, thickness: 6, steel: 'ST37', area: 1493, E: 210000, yieldStrength: 240 },
  { diameter: 6, thickness: 7, steel: 'ST37', area: 1710, E: 210000, yieldStrength: 240 },
  { diameter: 6, thickness: 8, steel: 'ST37', area: 1927, E: 210000, yieldStrength: 240 },
  { diameter: 7, thickness: 6, steel: 'ST44', area: 1600, E: 220000, yieldStrength: 270 },
  { diameter: 7, thickness: 7, steel: 'ST44', area: 1805, E: 220000, yieldStrength: 270 },
  { diameter: 7, thickness: 8, steel: 'ST44', area: 2020, E: 220000, yieldStrength: 270 },
  { diameter: 8, thickness: 6, steel: 'ST52', area: 1750, E: 230000, yieldStrength: 360 },
  { diameter: 8, thickness: 7, steel: 'ST52', area: 1980, E: 230000, yieldStrength: 360 },
  { diameter: 8, thickness: 8, steel: 'ST52', area: 2210, E: 230000, yieldStrength: 360 },
  { diameter: 10, thickness: 6, steel: 'ST37', area: 2200, E: 210000, yieldStrength: 240 },
  { diameter: 10, thickness: 7, steel: 'ST37', area: 2450, E: 210000, yieldStrength: 240 },
  { diameter: 10, thickness: 8, steel: 'ST37', area: 2700, E: 210000, yieldStrength: 240 },
  { diameter: 12, thickness: 6, steel: 'ST44', area: 2800, E: 220000, yieldStrength: 270 },
  { diameter: 12, thickness: 7, steel: 'ST44', area: 3100, E: 220000, yieldStrength: 270 },
  { diameter: 12, thickness: 8, steel: 'ST44', area: 3400, E: 220000, yieldStrength: 270 },
  { diameter: 14, thickness: 6, steel: 'ST52', area: 3350, E: 230000, yieldStrength: 360 },
  { diameter: 14, thickness: 7, steel: 'ST52', area: 3700, E: 230000, yieldStrength: 360 },
  { diameter: 14, thickness: 8, steel: 'ST52', area: 4000, E: 230000, yieldStrength: 360 },
];

// المقارنات
let compatiblePipes = [];

pipesData.forEach(pipe => {
  const pipeLoad = pipe.yieldStrength * pipe.area;
  
  const rOuter = inchToMm(pipe.diameter) / 2;
  const rInner = rOuter - pipe.thickness;
  const I = (Math.PI / 4) * (rOuter ** 4 - rInner ** 4);
  const K = 0.5;
  const Leff = K * length;
  const pipeBuckling = (Math.PI ** 2 * pipe.E * I) / (Leff ** 2);

  // الشرط: الماسورة تتحمل نفس أو أعلى من القيم المدخلة
  if (pipeLoad >= loadCapacity && pipeBuckling >= bucklingLoad) {
    compatiblePipes.push({
      diameter: pipe.diameter,
      thickness: pipe.thickness,
      steel: pipe.steel,
      load: pipeLoad.toFixed(2),
      buckling: pipeBuckling.toFixed(2),
    });
  }
});

if (compatiblePipes.length > 0) {
  resultsDiv.innerHTML += `<h4>الأنابيب المتوافقة (نفس أو أكبر تحمل):</h4><ul>`;
  compatiblePipes.forEach(p => {
    resultsDiv.innerHTML += `<li>
      ${p.diameter} بوصة × ${p.thickness} مم – ${p.steel}
      <br>قوة الشد/الضغط: ${p.load} نيوتن، قوة الانبعاج: ${p.buckling} نيوتن
    </li>`;
  });
  resultsDiv.innerHTML += `</ul>`;
} else {
  resultsDiv.innerHTML += `<p>لا توجد مواسير في القائمة تتحمل نفس الأحمال أو أكبر.</p>`;
}
