export interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Ariel',
}

const passenger2: Passenger = {
    name: 'Mili',
    children: ['Pinky', 'Ori'],
}

const returnChildrenNumber = ( passenger: Passenger): number => {
    const howManyChildren = passenger.children?.length || 0;
    // const howManyChildren = passenger.children!.length;
    console.log(passenger.name, howManyChildren, 'hijos');
    return howManyChildren;
}

returnChildrenNumber(passenger2);