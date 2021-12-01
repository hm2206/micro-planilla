import { Readable } from 'stream';

export class ParseBufferToReable {
  constructor(private buffer: Buffer) {}

  public createStream() {
    const readable = new Readable();
    readable._read = () => {null};
    readable.push(this.buffer);
    readable.push(null);
    return readable;
  }

  public static toStream(buffer: Buffer) {
    const api = new ParseBufferToReable(buffer);
    return api.createStream();
  }
}