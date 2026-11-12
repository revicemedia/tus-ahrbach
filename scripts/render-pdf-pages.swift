// Rendert alle Seiten einer PDF als JPEG: render.swift <pdf> <zielordner> <breite> <präfix> <qualität>
import Foundation
import PDFKit
import AppKit

let args = CommandLine.arguments
guard args.count == 6, let doc = PDFDocument(url: URL(fileURLWithPath: args[1])) else { print("Fehler"); exit(1) }
let outDir = URL(fileURLWithPath: args[2]); let width = CGFloat(Double(args[3])!); let prefix = args[4]; let quality = Double(args[5])!
try FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)
for i in 0..<doc.pageCount {
  let page = doc.page(at: i)!
  let box = page.bounds(for: .mediaBox)
  let scale = width / box.width
  let size = CGSize(width: width, height: (box.height * scale).rounded())
  let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(size.width), pixelsHigh: Int(size.height), bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
  NSGraphicsContext.saveGraphicsState()
  let ctx = NSGraphicsContext(bitmapImageRep: rep)!
  NSGraphicsContext.current = ctx
  ctx.cgContext.setFillColor(NSColor.white.cgColor); ctx.cgContext.fill(CGRect(origin: .zero, size: size))
  ctx.cgContext.scaleBy(x: scale, y: scale)
  page.draw(with: .mediaBox, to: ctx.cgContext)
  NSGraphicsContext.restoreGraphicsState()
  let data = rep.representation(using: .jpeg, properties: [.compressionFactor: quality])!
  try data.write(to: outDir.appendingPathComponent(String(format: "%@-%02d.jpg", prefix, i + 1)))
}
print("\(doc.pageCount) Seiten, \(Int(width))x\(Int((doc.page(at: 0)!.bounds(for: .mediaBox).height * width / doc.page(at: 0)!.bounds(for: .mediaBox).width).rounded()))")
