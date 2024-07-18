import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from './userSlice';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');

  const handleSave = () => {
    dispatch(updateProfile({ name, email }));
  };

  return (
    <div>
      <h2>Profile</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
};

export default Profile;
