import {faker} from '@faker-js/faker';
import {Types} from './types';

export namespace Faker {
  export namespace Artifact {
    export function create(count = 1) {
      const artifacts = [];
      for (let i = 0; i < count; i++) {
        const artifact = {
          id: faker.string.uuid(),
          name: faker.person.firstName(),
          description: faker.lorem.paragraph(),
          images: [faker.image.url(), faker.image.url(), faker.image.url()],
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          address: faker.location.streetAddress(),
          features: [
            faker.helpers.arrayElement([
              'Entrega a domicilio',
              'Para llevar',
              'Reservaciones',
              'Servicio en mesa',
            ]),
            faker.helpers.arrayElement([
              'Entrega a domicilio',
              'Para llevar',
              'Reservaciones',
              'Servicio en mesa',
            ]),
          ],
          geolocation: {
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
          },
          contact: {
            phone: [faker.phone.number()],
            facebook: faker.internet.url(),
            instagram: faker.internet.url(),
            twitter: faker.internet.url(),
            website: faker.internet.url(),
            email: faker.internet.email(),
          },
        } as Types.Artifact;
        artifacts.push(artifact);
      }
      return artifacts;
    }
  }
}
