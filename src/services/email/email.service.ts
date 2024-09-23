import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import config from '@src/config';
import logger from '@logger';
import { validateEmail } from '@src/services/utils/common';
import { TEMPLATES } from './email.templates';


const mailTransport = {
  host: config.email.host,
  port: config.email.port,
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(mailTransport);

interface SendProperties {
  receiver: string;
  data: any;
  templateName: string;
}

async function send({ receiver, data, templateName }: SendProperties) {
  try {
    if (!receiver || !validateEmail(receiver)) {
      return Promise.reject({ message: `Invalid email addresss ${receiver}`, code: 400 });
    }

    logger.debug(`[ EMAIL SERVICE ] Sending email to ${receiver}`);

    const { htmlToSend, subject } = getTemplate(templateName, data);

    return transport.sendMail({
      from: mailTransport.auth.user,
      to: receiver,
      subject,
      html: htmlToSend,
    });
  } catch (err) {
    logger.error(`[ EMAIL SERVICE ] Could not send email to ${receiver}. Error: ${err}`);
  }
}

function getTemplate(templateName: string, data: any) {
  const temp = (TEMPLATES as Record<string, any>)[templateName];

  const templatePath = path.join(__dirname, 'templates', temp.path);
  const source = fs.readFileSync(templatePath, 'utf8');

  const template = handlebars.compile(source);
  const htmlToSend = template(data);

  return { htmlToSend, subject: temp.subject };
}

export const emailService = {
  send,
};
