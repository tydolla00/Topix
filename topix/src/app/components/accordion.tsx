"use client";
import { useRouter } from "next/navigation";

export const Accordion = () => {
  const navigate = useRouter();
  return (
    <div className="join join-vertical w-full p-3">
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">
          Enjoy the fun with friends!
        </div>
        <div className="collapse-content text-center">
          <p>
            Create an account to start the conversation and settle the debate
            with friends!
          </p>
          <div
            onClick={() => navigate.push("/register")}
            className="btn btn-outline btn-primary w-full"
          >
            Sign Up
          </div>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">
          Test your knowledge on our favorite Topix Quizzes!
        </div>
        <div className="collapse-content text-center">
          <p>
            Think you're a Harry Potter Wiz? Are you the ultimate RDC fan? Test
            your knowledge here 👇
          </p>
          <div
            onClick={() => navigate.push("/quizzes")}
            className="btn btn-outline btn-primary w-full"
          >
            Click here
          </div>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">Contact me!</div>
        <div className="collapse-content text-center">
          <p>
            Let me know what you like, don't like, chat to me about React, give
            me tips, alert me of bugs. Buzzzz 🐝
          </p>
          <div
            onClick={() => navigate.push("/contact")}
            className="btn btn-outline btn-primary w-full"
          >
            Click here
          </div>
        </div>
      </div>
    </div>
  );
};
