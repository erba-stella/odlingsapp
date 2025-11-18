import styles from "./plantForm.module.css";

interface Props {
  nameError: string | null;
  plantError: string | null;
}

export const ValidationMessages = ({ nameError, plantError }: Props) => {
  const isValidationError = nameError || plantError;

  return (
    <div className={styles.validationMsg}>
      {isValidationError && (
        <p className={styles.error}>Fyll i formuläret för att spara växt:</p>
      )}
      <ul>
        {nameError && <li>{nameError}</li>}
        {plantError && <li>{plantError}</li>}
      </ul>
    </div>
  );
};