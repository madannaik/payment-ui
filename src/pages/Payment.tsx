import React, { useState, useEffect } from "react";
import card from "../assets/cards.svg";
import { carddata, formdata } from "../utils/types";
import { cardresorce } from "../utils/constanst";
import { useHistory } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Payment() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<formdata> = (data: formdata) =>
    his.push("./success");
  const [state, setstate] = useState<Boolean>(false);
  const [showCard, setShowCard] = useState<Boolean>(false);
  const his = useHistory();
  const watchcardno = watch(["cardNumber", "cvv"]);
  const onClick = (data: carddata) => {
    for (const [key, value] of Object.entries(data)) {
      setValue(key, value);
    }
    setstate(!state);
  };
  useEffect(() => {
    // watchcardno.listeners
    const subscription = watch((value, { name, type }) => {
      let val: string = value.cardNumber
        .replace(/\W/gi, "")
        .replace(/(.{4})/g, "$1 ");
      if (val.length === 16 && val !== value.cardNumber) {
        setValue("cardNumber", val);
        setShowCard(true);
      } else if (val.length >= 16 && val.length <= 20) {
        setShowCard(true);
      } else {
        setShowCard(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, watchcardno]);
  return (
    <div className="payment">
      <div className="payment__card">
        <form
          action=""
          className="payment__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>Payment</h1>
          <div className="payment__form--email">
            <input
              required
              type="email"
              placeholder="Email"
              id="email"
              {...register("email", { required: true })}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="payment__form--saved_cards">
            <div>
              <h4
                className="heading"
                onClick={() => {
                  setstate(!state);
                }}
              >
                View saved cards
              </h4>
              <span
                className={`small-card ${showCard ? "active" : " "}`}
              ></span>
            </div>

            <div
              className={`cards`}
              style={{
                visibility: `${state ? "visible" : "hidden"}`,
                height: `${state ? "15rem" : "0"}`,
              }}
            >
              {cardresorce.map((data) => {
                return (
                  <div
                    className="cards__space"
                    onClick={() => {
                      onClick(data);
                    }}
                  >
                    <div className="cards__space--image">
                      <img src={card} alt="" />
                    </div>
                    <div className="cards__space--info">
                      <div className="name--date">
                        <span>{data.name}</span>
                        <span>03/25</span>
                      </div>
                      <div className="card-no">{data.cardNumber}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="payment__form--cardno">
            <input
              required
              type="string"
              placeholder="Card Number"
              id="card_number"
              {...register("cardNumber", { required: true, maxLength: 19 })}
            />
            {errors.cardNumber && errors.cardNumber.type === "maxLength" && (
              <span>Max length exceeded </span>
            )}
            <label htmlFor="card_number">Card Number</label>
          </div>
          <div className="payment__form--exp">
            <div style={{ marginRight: ".5rem" }}>
              <input
                required
                type="text"
                placeholder="MM/YY"
                id="card-exp"
                {...register("exp", { required: true })}
              />
              <label htmlFor="card-exp">Exp Date</label>
            </div>
            <div>
              <input
                required
                type="password"
                placeholder="CVV"
                id="card-cvv"
                {...register("cvv", { required: true, maxLength: 3 })}
              />
              <label htmlFor="card-cvv">
                {errors.cvv && errors.cvv.type === "maxLength" ? (
                  <span>CVV Max length exceeded </span>
                ) : (
                  <span>CVV</span>
                )}
              </label>
            </div>
          </div>

          <div className="payment__form--cardname">
            <input
              required
              type="text"
              placeholder="Name on the card"
              id="card-name"
              {...register("name", { required: true })}
            />
            <label htmlFor="card-name">Name on the card</label>
          </div>
          <div className="payment__form--country">
            <input
              required
              type="number"
              placeholder="Zip Code"
              id="card-country"
              {...register("zip", { required: true })}
            />
            <label htmlFor="card-country">Zip Code</label>
          </div>

          <button className="payment__form--submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
