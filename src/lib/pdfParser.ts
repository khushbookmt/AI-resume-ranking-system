import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export class PdfParseError extends Error {}

const MAX_FILE_SIZE_MB = 10;

/**
 * Validates a File is a PDF within the size limit.
 */
export function validatePdfFile(file: File): void {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    throw new PdfParseError('Please upload a PDF file.');
  }
  const sizeMb = file.size / (1024 * 1024);
  if (sizeMb > MAX_FILE_SIZE_MB) {
    throw new PdfParseError(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
  }
}

/**
 * Extracts plain text from a PDF File, page by page, preserving rough
 * line structure so the LLM receives readable resume content.
 */
export async function extractTextFromPdf(file: File): Promise<string> {
  validatePdfFile(file);

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const pageTexts: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    let lastY: number | null = null;
    let line = '';
    const lines: string[] = [];

    for (const item of content.items) {
      if (!('str' in item)) continue;
      const textItem = item as { str: string; transform: number[] };
      const y = textItem.transform[5];

      if (lastY !== null && Math.abs(y - lastY) > 2) {
        lines.push(line.trim());
        line = '';
      }
      line += `${textItem.str} `;
      lastY = y;
    }
    if (line.trim()) lines.push(line.trim());

    pageTexts.push(lines.join('\n'));
  }

  const fullText = pageTexts.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();

  if (!fullText || fullText.length < 30) {
    throw new PdfParseError(
      'Could not extract readable text from this PDF. It may be a scanned image — try a text-based PDF.'
    );
  }

  return fullText;
}
