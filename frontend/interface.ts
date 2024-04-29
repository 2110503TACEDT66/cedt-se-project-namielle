export interface BookingItem {
    _id: string,
    checkOutDate: string,
    checkInDate: string,
    user: string,
    hotel: {
        _id: string,
        name: string,
        address: string,
        tel: string,
        file: string,
        id: string
    },
    roomDetail: {
        data: {
            name: string,
            personLimit: number,
            price: number,
            roomLimit: number
        }
    },
    review:{
        rating: number,
        count: number
    }
    createdAt: string,
    __v: number,
}

export interface CartItem {
    _id: string,
    checkInDate: string,
    checkOutDate: string,
    hid: string,
    name: string,
    price: number,
    picture: string,
    roomType: string,
    roomName: string,
    address: string,
    review: {
        rating: number,
        count: number
    }
}

export interface BookItem {
    user: string,
    hotel: string,
    checkInDate: string,
    checkOutDate: string,
    file: string,
}

export interface UserJson {
    success: boolean,
    data: UserData,
}

export interface UserData {
    _id: string,
    name: string,
    email: string,
    tel: string,
    role: string,
    createdAt: string,
    __v: number
}

export interface HotelJson {
    data: {
        _id: string;
        name: string;
        address: string;
        tel: string;
        capacity: number;
        __v: number;
        file: string;
        price: number;
        city: string;
        bookCount: number;
        booking: {
            _id: string;
            hotel: string;
        }[];
        roomType: {
            _id: string;
            hotel: string;
            name: string;
            personLimit: number;
            price: number;
            roomLimit: number;
            __v: number;
        }[];
    };
}

export interface ReviewJson {
    count: number,
    data: {
        _id: string,
        user: string,
        hotel: string,
        stars: Number,
        description: String,
        createAt: Date,
        isHidden: Boolean,
    }[],
}

export interface discountJson {
    count: number,
    data: {
        name: string,
        info: string,
        code: string,
        percentage: number,
        image:string,
        _id: string,
        __v: number,
    }[],
}
