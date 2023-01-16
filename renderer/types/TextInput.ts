export interface InputProp {
  type: string;
  value: string;
  error?: string;
  className?: string;
  setValue: (str: string) => void;
  placeholder?: string;
}
