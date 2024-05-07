declare type User = {
    id: string;
    user_name: string;
    email: string;
    password: string;
};

declare type UserResponse = Partial<User>;

declare type Category = {
    id: string;
    category_name: string;
};

declare type Merchandise = {
    id: string;
    merchandise_name: string;
    price: number;
    description: string;
    filename: string;
    category: Category | string;
    owner: User;
};

declare type Chat = {
    id: string;
    members: User[];
    timestamp: Date;
};

declare type Message = {
    id: string;
    chatId: string;
    senderId: string;
    text: string;
    timestamp: Date;
};
