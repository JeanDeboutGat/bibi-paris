/**
 * UI component type definitions
 */

export type SpinnerStyle = 'default' | 'minimal' | 'elegant';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export type LoadingSpinnerProps = {
  fullScreen?: boolean;
  delay?: number;
  style?: SpinnerStyle;
  size?: SpinnerSize;
};

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
};

export type InputSize = 'sm' | 'md' | 'lg';

export type InputProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  size?: InputSize;
  className?: string;
};

export type SelectProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    value: string;
    label: string;
  }[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  size?: InputSize;
  className?: string;
};

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children: React.ReactNode;
};
