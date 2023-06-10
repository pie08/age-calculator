import { useState } from "react";

export default function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({});
  const [formError, setFormError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const curDate = new Date(Date.now());
    const userDate = new Date(year, month - 1, day);

    if (day > 31 || !day)
      return setFormError({
        type: "day",
        message: "Invalid day",
      });
    if (month > 12 || !month)
      return setFormError({
        type: "month",
        message: "Invalid month",
      });
    if (curDate - userDate <= 0 || !year)
      return setFormError({
        type: "year",
        message: "Invalid year",
      });

    // Calculate age
    const diffMs = curDate - userDate;
    // milliseconds from epoch
    const ageDate = new Date(diffMs);

    setAge({
      years: ageDate.getFullYear() - 1970,
      months: ageDate.getMonth(),
      days: ageDate.getDate(),
    });
    setFormError(null);
  }

  return (
    <div className="calculator">
      <InputForm
        day={day}
        month={month}
        year={year}
        onSetDay={setDay}
        onSetMonth={setMonth}
        onSetYear={setYear}
        onSubmit={handleSubmit}
        formError={formError}
      />
      <DisplayAge age={age} />
    </div>
  );
}

function InputForm({
  day,
  month,
  year,
  onSetDay,
  onSetMonth,
  onSetYear,
  onSubmit,
  formError,
}) {
  return (
    <form className="calculator__form" onSubmit={onSubmit}>
      <div className="form__group">
        <label for="days">Day</label>
        <input
          type="number"
          id="day"
          placeholder="DD"
          value={day}
          onChange={(e) =>
            onSetDay(+e.target.value !== 0 ? e.target.value : "")
          }
          style={formError?.type === "day" ? { border: "1px solid red" } : {}}
        />
        {formError?.type === "day" && (
          <p className="error">{formError.message}</p>
        )}
      </div>

      <div className="form__group">
        <label for="month">Month</label>
        <input
          type="number"
          id="month"
          placeholder="MM"
          value={month}
          onChange={(e) =>
            onSetMonth(+e.target.value !== 0 ? e.target.value : "")
          }
          style={formError?.type === "month" ? { border: "1px solid red" } : {}}
        />
        {formError?.type === "month" && (
          <p className="error">{formError.message}</p>
        )}
      </div>

      <div className="form__group">
        <label for="year">Year</label>
        <input
          type="number"
          id="year"
          placeholder="YYYY"
          value={year}
          onChange={(e) =>
            onSetYear(+e.target.value !== 0 ? e.target.value : "")
          }
          style={formError?.type === "year" ? { border: "1px solid red" } : {}}
        />
        {formError?.type === "year" && (
          <p className="error">{formError.message}</p>
        )}
      </div>

      <span className="line">&nbsp;</span>

      <button className="btn">
        <img src="./assets/images/icon-arrow.svg" alt="arrow icon" />
      </button>
    </form>
  );
}

function DisplayAge({ age }) {
  return (
    <div className="calculator__display-age">
      <h1>
        <span className="calculator__age-number">
          {age.years >= 0 ? age.years : "--"}
        </span>{" "}
        Years
      </h1>

      <h1>
        <span className="calculator__age-number">
          {age.months >= 0 ? age.months : "--"}
        </span>{" "}
        Months
      </h1>

      <h1>
        <span className="calculator__age-number">
          {age.days >= 0 ? age.days : "--"}
        </span>{" "}
        Days
      </h1>
    </div>
  );
}
