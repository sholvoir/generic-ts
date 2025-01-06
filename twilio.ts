import twilio from "twilio";
import type { VerificationInstance } from "twilio/lib/rest/verify/v2/service/verification";
import type { VerificationCheckInstance } from "twilio/lib/rest/verify/v2/service/VerificationCheck";

export class Twilio {
    #client;
    #serviceID;
    constructor(accountSid: string, authToken: string, serviceID: string) {
        this.#client = twilio(accountSid, authToken);
        this.#serviceID = serviceID;
    }
    async createVerification(to: string): Promise<VerificationInstance> {
        return await this.#client.verify.v2.services(this.#serviceID)
            .verifications.create({to, channel: 'sms'});
    }
    async createVerificationCheck(to: string, code: string): Promise<VerificationCheckInstance> {
        return await this.#client.verify.v2.services(this.#serviceID)
            .verificationChecks.create({code, to });
    }
}