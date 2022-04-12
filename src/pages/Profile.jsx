import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

const Profile = () => {
    const auth = getAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(auth.currentUser);
        console.log(auth.currentUser, 'current User');
    }, []);

    return user
        ? (
            <h1>{ user.displayName }</h1>
        )
        : (
            <h1>Not Logged In</h1>
       );
};

export default Profile;
