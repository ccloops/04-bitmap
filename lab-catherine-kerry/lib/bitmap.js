
'use strict';

const bitmap = module.exports = {};

bitmap.parseBitmap = (buffer) => {
  let parsedBitmap = {};

  const HEIGHT_OFFSET = 22;
  const PIXEL_TABLE_OFFSET = 10;
  const FILE_SIZE_OFFSET = 2;

  parsedBitmap.buffer = buffer;
  // vinicio - we are taking the first 2 characters because of the docs
  //           https://en.wikipedia.org/wiki/BMP_file_format
  parsedBitmap.type = buffer.toString('utf-8',0,2);
  parsedBitmap.fileSize = buffer.readInt32LE(FILE_SIZE_OFFSET);
  parsedBitmap.pixelTableOffset = buffer.readInt32LE(PIXEL_TABLE_OFFSET);
  parsedBitmap.height = buffer.readInt32LE(HEIGHT_OFFSET);
  parsedBitmap.colorTable = buffer.slice(54, 1077);
  parsedBitmap.colorTable.forEach((value, position) => {
    console.log(value);
    if(position % 2 === 0) {
      buffer.writeUInt8(80, position + 54);     
    }
  });
  console.log(parsedBitmap.colorTable = buffer.slice(57, 1077));
  console.log(parsedBitmap);
  return parsedBitmap;
};