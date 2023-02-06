import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { CircularProgressbar } from "react-circular-progressbar";
import Countdown from "react-countdown";

const NotAccess = ({ delay }) => {
  const router = useRouter();
  const countDate = useMemo(() => Date.now() + delay * 1000, [delay]);
  const onComplete = async () => {
    await router.push("/login");
  };
  return (
    <div className="bg-white">
      <div className="w-10/12 m-auto min-h-screen flex items-center justify-center flex-col">
        <div className="text-xl pb-4">
          <span>
            Sorry, you don't have access, you will be redirected to{" "}
            <Link className="text-blue-600 hover:underline" href="/login">
              login
            </Link>{" "}
            page.
          </span>
        </div>
        <Countdown
          date={countDate}
          onComplete={onComplete}
          renderer={({ seconds }) => {
            return (
              <div className="w-16">
                <CircularProgressbar
                  maxValue={1}
                  className="black-progress"
                  value={seconds / delay}
                  counterClockwise
                  text={`${seconds}`}
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
NotAccess.propTypes = {
  delay: PropTypes.number,
};
NotAccess.defaultProps = {
  delay: 5,
};
export default NotAccess;
