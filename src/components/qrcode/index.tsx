import QRCode from "qrcode.react";

export interface QRCodeProps {
  width?: number;
  height?: number;
  value: string;
  style?: React.CSSProperties;
}

export default ({ value, ...props }: QRCodeProps) => {
  return <QRCode value={value} {...props} />;
};
