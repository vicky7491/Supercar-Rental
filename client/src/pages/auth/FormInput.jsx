import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormInput = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default FormInput;
