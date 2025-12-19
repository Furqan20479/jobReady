import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
function Profile() {
  const { sessionID } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(
          `http://localhost:5000/profile/${sessionID}`
        );
        const data = await response.json();
        if (data.ok) {
          setEmail(data.email);
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, [sessionID]);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <h1>Welcome User</h1>
      <h2>Email: {email}</h2>

      <h1>
        <button onClick={handleLogout}>Logout</button>
      </h1>
    </>
  );
}
export default Profile;
