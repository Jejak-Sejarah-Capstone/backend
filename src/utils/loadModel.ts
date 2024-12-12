import * as tf from '@tensorflow/tfjs-node';
import * as dotenv from 'dotenv';

dotenv.config();

let model: tf.LayersModel;

export async function loadModel() {
    try {
        model = await tf.loadLayersModel(process.env.MODEL_URL as string);
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading model:', error);
    }
}

export function getModel() {
    if (!model) {
        throw new Error('Model is not loaded yet');
    }
    return model;
}
