const UserCreds = require('../models/UserCreds');

exports.profileLogging = async (req, res) => {
    try {
        const { customerName, username, password, gender, preferredCategory } = req.body;

        
        if (!customerName || !username || !password) {
            return res.status(400).json({ error: 'Customer Name, username, and password are required fields' });
        }

        
        const existingUser = await UserCreds.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        
        const newUser = new UserCreds({
            customerName,
            username,
            password,
            gender,
            preferredCategory,
        });

        
        await newUser.save();

        
        res.status(201).json({ message: 'User profile created successfully' });
    } catch (error) {
        console.error('Error creating user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
