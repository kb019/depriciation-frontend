export interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    triggerFunction: (searchVal: string) => void;
    placeHolder:string
  }