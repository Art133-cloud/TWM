import styles from "./Discover.module.scss";
import Dropdown from "../dropdown/Dropdown";
import DatePicker from "../date/Date";
import BudgetRangeSelector from "../range/Range";
import HomeButton from "../basic/homeButton/HomeButton";

export default function Discover() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.discoverBlock}>
      <form onSubmit={handleSubmit} className={styles.formDiscover}>
        <Dropdown />
        <DatePicker />
        <BudgetRangeSelector budgetRange="$500 - $10,000" />
        <HomeButton />
      </form>
    </div>
  );
}
