import config from '@srcPath/common/config';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// Link for mailer set up tutorial:
// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

class MailService {
  oauth2Client: any;
  accessToken: string;
  mailOptions: { from: string; subject: string; generateTextFromHTML: boolean };
  smtpTransport: any;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      config.OAuth2.clientId,
      config.OAuth2.clientSecret,
      config.OAuth2.redirectUrl
    );

    this.oauth2Client.setCredentials({
      refresh_token: config.OAuth2.refreshToken,
    });

    this.accessToken = this.oauth2Client.getAccessToken();

    this.smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: config.OAuth2.user,
        clientId: config.OAuth2.clientId,
        clientSecret: config.OAuth2.clientSecret,
        refreshToken: config.OAuth2.refreshToken,
        accessToken: this.accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    this.mailOptions = {
      from: config.OAuth2.user,
      subject: 'Wine Baskets account activation',
      generateTextFromHTML: true,
    };
  }

  async sendActivationMail(to: string, link: string) {
    const html: string = `
      <div>
            <h1>Welcome to Wine Baskets.</h1>
            <p>To activate your account, please follow the link: <a href="${link}">${link}</a></p>
      </div>
      `;

    await this.smtpTransport.sendMail({ ...this.mailOptions, to, html });
  }
}

export default new MailService();
