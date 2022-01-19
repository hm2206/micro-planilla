

export class ValidateChecked {
  constructor(private numberAccount: string) { }
  
  public isCheck(): boolean {
    return this.numberAccount.length <= 0;
  }

  public compare(valueDefault: boolean): boolean {
    const isChecked = this.isCheck();
    return isChecked ? isChecked : valueDefault;
  }
}