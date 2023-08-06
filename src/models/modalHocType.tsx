export type ModalHocType = <T extends WrappedComponentProps>(
    Component: React.ComponentType<T>
  ) => React.FC<T>;

  export type WrappedComponentProps = {
  
    open: boolean;
    setOpen:React.Dispatch<boolean>;
    close?:()=>void;
    triggerAction:()=>void
    data?:unknown
  };