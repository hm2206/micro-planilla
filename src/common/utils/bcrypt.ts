import * as bcrypt from 'bcrypt';

export const bcryptOptions = {
  saltOrRounds: 10
}

export class Bcrypt {

  public static hash(text: string): Promise<string> {
    return bcrypt.hash(text, bcryptOptions.saltOrRounds);
  }

  public static compare(textPlain: string, textHash): Promise<boolean> {
    return bcrypt.compare(textPlain, textHash);
  }

}