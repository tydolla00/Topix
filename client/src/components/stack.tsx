import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Stack = ({ data }: { data: Stack }) => {
  const navigate = useNavigate();
  const [stacks, setStacks] = useState(data);
  useEffect(() => {
    setTimeout(() => {
      document
        .getElementById(stacks[stacks.length - 1].id)
        ?.classList.remove("fly");
    }, 1000);
  }, [stacks]);
  return (
    <div className="stack indicator sm:w-52 md:w-72 w-full">
      {stacks.map((item) => (
        <div
          id={item.id}
          key={item.id}
          onClick={() => {
            document.getElementById(`${item.id}`)?.classList.add("fly");
            let arr = [...stacks];
            let old = arr.shift();
            if (old) arr.push(old);
            setStacks(arr);
            document.getElementById(`${item.id}`)?.remove();
          }}
          className="border border-base-content card bg-base-100 p-2 sm:w-60 w-full"
        >
          <div className="indicator-item badge badge-primary animate-bounce">
            Click Me!
          </div>
          <div className="flex p-2">
            <div className="avatar placeholder mr-3">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10 ring ring-primary ring-offset-base-100">
                <span className="text-2xl">{item.avi}</span>
              </div>
            </div>
            <div>
              <p>{item.submitter}</p>
              <div className="text-gray-400">Submissions: 2</div>
            </div>
          </div>
          <div className="card-body text-center">{item.text}</div>
          <button
            className="btn btn-ghost btn-outline btn-primary w-6/12 mx-auto"
            onClick={() => navigate(item.url)}
          >
            Play Game
          </button>
        </div>
      ))}
    </div>
  );
};
export type Stack = {
  id: string;
  text: string;
  avi: string;
  url: string;
  submitter: string;
}[];
