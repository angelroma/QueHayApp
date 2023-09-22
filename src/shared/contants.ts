import * as ArtifactTypes from '@features/Artifact/types';

const FeatureIcon: {
  [key in string]: string;
} = {
  'Entrega a domicilio': 'truck',
  'Para llevar': 'shopping-bag',
  Reservaciones: 'book-open',
  'Servicio en mesa': 'coffee',
};

const Features: ArtifactTypes.Feature[] = [
  'Entrega a domicilio',
  'Para llevar',
  'Reservaciones',
  'Servicio en mesa',
];

const Constant = {
  FeatureIcon,
  Features,
};

export default Constant;
