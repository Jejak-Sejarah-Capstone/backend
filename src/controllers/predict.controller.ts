import { Request, Response } from 'express';
import * as tf from '@tensorflow/tfjs-node';
import { getModel } from '../utils/loadModel'; 

export const PredictController = {
    async predict(req: Request, res: Response): Promise<void> {
        const { latitude, longitude } = req.body;

        const lat = parseFloat(latitude);
        const long = parseFloat(longitude);
    
        if (isNaN(lat) || isNaN(long)) {
            res.status(400).json({ error: 'Invalid input: latitude and longitude must be numbers' });
        }   

        const inputData = tf.tensor2d([[lat, long]], [1, 2]); 
    
        const model = getModel(); 
        const prediction = model.predict(inputData) as tf.Tensor;

        const predictedValues = prediction.toFloat();

        const predictedCluster = prediction.argMax(-1).dataSync()[0];
    
        res.json({ 
            predictedValues: predictedValues.arraySync(),
            predictedCluster: predictedCluster 
        });
    }
};