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
    picture: string
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
