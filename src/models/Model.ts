import {type Takeaway} from '../api';

export const Model = (ProxyTarget) => {
    return new Proxy(ProxyTarget, {
        construct(Target, args) {
            const model = new Target(...args);

            return new Proxy(model, {
                get(target, name, receiver) {
                    if (name === 'data' || (Target.relationships && Target.relationships.includes(name))) {
                        return target[name];
                    }

                    if (target.data && Object.prototype.hasOwnProperty.call(target.data, name)) {
                        return target.data[name];
                    }
                    return Reflect.get(target, name, receiver);
                },
                set(target, name, value) {
                    if (name === 'data' || (Target.relationships && Target.relationships.includes(name))) {
                        target[name] = value;
                        return true;
                    }

                    target.data[name] = value;
                    return true;
                }
            });
        }
    });
};

export interface Data {
    [k: string]: any;
}

export class BaseModel {
    takeaway: Takeaway;
    data: any;

    constructor(takeaway: Takeaway, data: Data) {
        this.takeaway = takeaway;
        this.data = data;
    }
}
