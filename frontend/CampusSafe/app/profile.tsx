import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Profile {
  user_id: number;
  username: string;
  email: string;
  phone_number: string | null;
  is_user_admin: boolean;
}

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});

  useEffect(() => {
    // Fetch user profile data
    fetch(`/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error('Error fetching profile:', err));
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveProfile = () => {
    fetch(`/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setEditMode(false);
      })
      .catch((err) => console.error('Error updating profile:', err));
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      {editMode ? (
        <div>
          <label>
            Phone Number:
            <input
              type="text"
              name="phone_number"
              defaultValue={profile.phone_number || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Is Admin:
            <input
              type="checkbox"
              name="is_user_admin"
              defaultChecked={profile.is_user_admin}
              onChange={(e) =>
                setFormData({ ...formData, is_user_admin: e.target.checked })
              }
            />
          </label>
          <button onClick={saveProfile}>Save</button>
        </div>
      ) : (
        <div>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone Number:</strong> {profile.phone_number || 'N/A'}</p>
          <p><strong>Admin:</strong> {profile.is_user_admin ? 'Yes' : 'No'}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
