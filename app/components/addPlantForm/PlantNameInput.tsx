interface Props {
  value: string;
  onChange: (v: string) => void;
}

export const PlantNameInput = ({ value, onChange }: Props) => (
  <fieldset>
    <legend className="visually-hidden">Ange växtens namn</legend>
    <label htmlFor="plantName">Växtens namn*</label>
    <input
      type="text"
      id="plantName"
      placeholder='t.ex. "Stupice tomat"'
      value={value}
      autoComplete="off"
      aria-required={true}
      onChange={(e) => onChange(e.target.value)}
    />
  </fieldset>
);