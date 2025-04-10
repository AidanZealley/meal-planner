export type DialogConfirmationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  action: React.ReactNode;
};
