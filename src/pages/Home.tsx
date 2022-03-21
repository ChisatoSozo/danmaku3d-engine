import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <ul>
      <li>
        <Link to="/games">Games</Link>
      </li>
    </ul>
  );
};
