export const downloadQRCode = () => {
  const svg = document.getElementById('QRCode');
  const svgData = new XMLSerializer().serializeToString(svg!);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.download = 'QRCode';
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
};

export const printQRCode = () => {
  const qrCode = document.getElementById('QRCode')!;
  const printWindow = window.open('', '', 'height=400,width=600');
  printWindow?.document.write('<html><head><title>Print SVG</title></head><body>');
  printWindow?.document.write(qrCode.outerHTML);
  printWindow?.document.write('</body></html>');
  printWindow?.document.close();
  printWindow?.print();
};
