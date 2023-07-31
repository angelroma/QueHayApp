import {faker} from '@faker-js/faker';
import {Types} from './types';

export namespace Faker {
  export namespace Artifact {
    export function create(count = 1) {
      const artifacts = [];
      for (let i = 0; i < count; i++) {
        const artifact: Types.Artifact = {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          imageUrls: [faker.image.url(), faker.image.url(), faker.image.url()],
          createdTimestamp: faker.date.past(),
          updatedTimestamp: faker.date.recent(),
          address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            postalCode: faker.location.zipCode(),
            country: faker.location.country(),
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
          },
          features: [
            faker.helpers.arrayElement([
              'Entrega a domicilio',
              'Para llevar',
              'Reservaciones',
              'Servicio en mesa',
            ]),
          ],

          primaryPhone: faker.phone.number(),
          secondaryPhone: faker.phone.number(),
          email: faker.internet.email(),
          website: faker.internet.url(),
          socialMedia: [
            {
              platform: 'Facebook',
              handle: faker.internet.userName(),
            },
            {
              platform: 'Instagram',
              handle: faker.internet.userName(),
            },
          ],
          tags: [
            {
              id: faker.string.uuid(),
              label: faker.lorem.word(),
            },
          ],
          hoursOfOperation: [
            {
              day: 'Monday',
              openTime: '09:00',
              closeTime: '18:00',
            },
            {
              day: 'Tuesday',
              openTime: '09:00',
              closeTime: '18:00',
            },
            {
              day: 'Wednesday',
              openTime: '09:00',
              closeTime: '18:00',
            },
            {
              day: 'Thursday',
              openTime: '09:00',
              closeTime: '18:00',
            },
            {
              day: 'Friday',
              openTime: '09:00',
              closeTime: '18:00',
            },
            {
              day: 'Saturday',
              openTime: '09:00',
              closeTime: '18:00',
            },
            {
              day: 'Sunday',
              openTime: '09:00',
              closeTime: '22:00',
            },
          ],
          userInteractions: {
            likes: faker.number.int({
              min: 0,
              max: 100,
            }),
            dislikes: faker.number.int({
              min: 0,
              max: 100,
            }),
          },
          category: faker.commerce.department(),
        };
        artifacts.push(artifact);
      }
      return artifacts;
    }
  }
}
