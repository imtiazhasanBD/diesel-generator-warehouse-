import jsPDF from "jspdf";
import { SelectedItem } from "@/data/calculatorData";

interface PDFCalculationData {
  projectName: string;
  items: SelectedItem[];
  totalKW: number;
  totalKVA: number;
  recommendedKVA: number;
  powerFactor: number;
  reserveMargin: number;
  customerName?: string;
  customerPhone?: string;
  customerCompany?: string;
}

export function generateCalculationPDF(data: PDFCalculationData) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Color Palette
  const navy: [number, number, number] = [14, 16, 20]; // #0E1014
  const primaryRed: [number, number, number] = [224, 5, 1]; // #E00501
  const darkCard: [number, number, number] = [20, 21, 24]; // #141518
  const pale: [number, number, number] = [248, 250, 252];
  const ink: [number, number, number] = [17, 24, 39];
  const muted: [number, number, number] = [100, 116, 139];
  const white: [number, number, number] = [255, 255, 255];
  const blueAccent: [number, number, number] = [37, 99, 235];
  const greenAccent: [number, number, number] = [16, 185, 129];

  // 1. Header Banner
  doc.setFillColor(...navy);
  doc.rect(0, 0, W, 46, "F");

  // Orange underline strip
  doc.setFillColor(...primaryRed);
  doc.rect(0, 44, W, 2.5, "F");

  // DGW Logo Badge
  doc.setFillColor(...primaryRed);
  doc.roundedRect(15, 10, 26, 25, 3.5, 3.5, "F");
  doc.setTextColor(...white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("DGW", 28, 25.5, { align: "center" });

  // Header Title
  doc.setFontSize(18);
  doc.text("DIESEL GENERATOR", 47, 19);
  doc.setFontSize(10.5);
  doc.setTextColor(226, 232, 240);
  doc.text("WAREHOUSE", 47, 26);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(190, 204, 224);
  doc.text("POWER SOLUTIONS. READY WHEN YOU ARE.", 47, 33);

  // Top Right Subheading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...white);
  doc.text("LOAD ASSESSMENT", 195, 18, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(203, 213, 225);
  doc.text("CUSTOMER ELECTRICAL SIZING REPORT", 195, 24, { align: "right" });

  // 2. Report Meta Banner
  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Facility Electrical Sizing Report", 15, 60);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...muted);
  doc.text("Connected equipment schedule, running load and generator kVA recommendation", 15, 66);

  // Meta Box
  doc.setFillColor(...pale);
  doc.roundedRect(15, 72, 180, 20, 2.5, 2.5, "F");
  doc.setTextColor(...muted);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.text("PROJECT TYPE", 21, 79);
  doc.text("ASSESSMENT DATE", 90, 79);
  doc.text("CUSTOMER / CONTACT", 145, 79);

  doc.setTextColor(...ink);
  doc.setFontSize(9);
  doc.text(data.projectName || "General Facility", 21, 86);
  doc.text(date, 90, 86);
  doc.text(data.customerName || data.customerCompany || "General Inquiry", 145, 86);

  // 3. Equipment Schedule Section
  let y = 103;
  doc.setFillColor(254, 242, 237);
  doc.roundedRect(15, y - 5, 5, 6.5, 1, 1, "F");
  doc.setTextColor(...primaryRed);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("01", 22.5, y);
  doc.setTextColor(...ink);
  doc.text("SELECTED EQUIPMENT SCHEDULE", 31, y);

  y += 5;
  // Table Header
  doc.setFillColor(...darkCard);
  doc.roundedRect(15, y, 180, 8.5, 1.5, 1.5, "F");
  doc.setTextColor(...white);
  doc.setFontSize(7.5);
  doc.text("EQUIPMENT DESCRIPTION", 22, y+5.8);
  doc.text("UNIT LOAD", 130, y+5.8);
  doc.text("QTY", 160, y+5.8);
  doc.text("TOTAL KW", 188, y+5.8, { align: "right" });

  y += 8.5;
  const maxRows = 16;
  const itemsShown = data.items.slice(0, maxRows);
  const rowH = 6.2;

  itemsShown.forEach((item, i) => {
    if (i % 2 === 0) doc.setFillColor(250, 251, 253);
    else doc.setFillColor(255, 255, 255);
    doc.rect(15, y, 180, rowH, "F");

    // Indicator bullet
    doc.setFillColor(...(i % 3 === 0 ? primaryRed : i % 3 === 1 ? blueAccent : greenAccent));
    doc.circle(19, y + rowH / 2, 0.9, "F");

    doc.setTextColor(...ink);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(item.name, 23, y + rowH * 0.68);

    doc.setTextColor(...muted);
    doc.text(`${item.kw.toFixed(2)} kW`, 130, y + rowH * 0.68);

    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.text(String(item.qty), 163, y + rowH * 0.68);

    doc.setTextColor(...primaryRed);
    const subtotalKW = (item.kw * item.qty).toFixed(2);
    doc.text(`${subtotalKW} kW`, 188, y + rowH * 0.68, { align: "right" });

    y += rowH;
  });

  if (data.items.length > maxRows) {
    doc.setTextColor(...muted);
    doc.setFontSize(7);
    doc.text(`+ ${data.items.length - maxRows} additional items included in overall calculation`, 20, y + 4);
    y += 6;
  }

  y += 8;

  // 4. Results Cards Banner
  doc.setFillColor(254, 242, 237);
  doc.roundedRect(15, y - 5, 5, 6.5, 1, 1, "F");
  doc.setTextColor(...primaryRed);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("02", 22.5, y);
  doc.setTextColor(...ink);
  doc.text("LOAD SIZING & GENERATOR SPECIFICATIONS", 31, y);

  y += 4.5;
  const cards = [
    {
      x: 15,
      w: 56,
      label: "CONNECTED LOAD",
      value: data.totalKW.toFixed(2),
      unit: "kW",
      color: blueAccent,
      bg: [239, 246, 255] as [number, number, number],
    },
    {
      x: 75,
      w: 56,
      label: "ESTIMATED RUNNING LOAD",
      value: data.totalKVA.toFixed(2),
      unit: "kVA",
      color: greenAccent,
      bg: [236, 253, 245] as [number, number, number],
    },
    {
      x: 135,
      w: 60,
      label: "RECOMMENDED GENSET",
      value: `${data.recommendedKVA || "—"}`,
      unit: "kVA Standby / Prime",
      color: primaryRed,
      bg: [255, 241, 235] as [number, number, number],
    },
  ];

  cards.forEach((c, i) => {
    doc.setFillColor(...c.bg);
    doc.roundedRect(c.x, y, c.w, 26, 2.5, 2.5, "F");
    doc.setFillColor(...c.color);
    doc.roundedRect(c.x, y, 2.5, 26, 1, 1, "F");

    doc.setTextColor(...muted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.2);
    doc.text(c.label, c.x + 6, y + 6.5);

    doc.setTextColor(...c.color);
    doc.setFontSize(i === 2 ? 16 : 14);
    doc.text(c.value, c.x + 6, y + 17);

    doc.setTextColor(...ink);
    doc.setFontSize(6.8);
    doc.text(c.unit, c.x + 6, y + 22);
  });

  y += 32;

  // 5. Calculation Basis
  doc.setFillColor(...navy);
  doc.roundedRect(15, y, 180, 16, 2.5, 2.5, "F");
  doc.setTextColor(...white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("ENGINEERING CALCULATION PARAMETERS", 22, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(226, 232, 240);
  doc.text(
    `Inductive Power Factor: ${data.powerFactor.toFixed(2)}  |  Inrush / Safety Reserve Buffer: ${Math.round(
      data.reserveMargin * 100
    )}%  |  Standard Frequency: 50 Hz, 3-Phase 415V`,
    22,
    y + 11.5
  );

  y += 22;

  // 6. Disclaimer
  doc.setTextColor(...muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.2);
  const disclaimer =
    "ENGINEERING DIRECTIVE: This report is a preliminary computer-assisted electrical sizing estimate based on representative equipment nameplate ratings. Actual generator selection must be finalized by our certified power systems engineers following a comprehensive single-line diagram (SLD) review, motor inrush curve analysis, harmonic distortion check, and physical site acoustic assessment across Bangladesh.";
  doc.text(doc.splitTextToSize(disclaimer, 180), 15, Math.min(y, 260));

  // 7. Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(15, 276, 195, 276);

  doc.setFillColor(...primaryRed);
  doc.roundedRect(15, 280, 4.5, 4.5, 1, 1, "F");
  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.8);
  doc.text("DIESEL GENERATOR WAREHOUSE (DGW)", 22, 284);

  doc.setTextColor(...primaryRed);
  doc.setFont("helvetica", "bold");
  doc.text("+880 1711-000000 | sales@dgw.com.bd", 195, 284, { align: "right" });

  doc.setTextColor(...muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.text("Nationwide Turnkey Power Solutions • 20 - 2500 kVA Stock Ready", 22, 289);

  // Trigger browser download
  const filename = `DGW-Load-Assessment-${(data.projectName || "Generator").replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
}

