export const Model = (Target) => {
    return new Proxy(Target, {
        construct(Target, args) {
            const model = new Target(...args);

            return new Proxy(model, {
                get(target, name, receiver) {
                    if (name === 'data' || (Target.relationships && Target.relationships.includes(name))) {
                        return target[name];
                    }

                    if (target.data && target.data.hasOwnProperty(name)) {
                        return target.data[name];
                    }
                    return Reflect.get(target, name, receiver);
                },
                set(target, name, value, receiver) {
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

export class BaseModel {
    constructor(takeaway, data) {
        this.takeaway = takeaway;
        this.data = data;
    }
};
