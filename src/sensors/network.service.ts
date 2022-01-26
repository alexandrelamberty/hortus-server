import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { IDevice } from 'local-devices'
import dns from 'dns'
import { error } from 'console'

@Injectable()
export class NetworkService {
  constructor() {}

  async scanNetwork(): Promise<IDevice[]> {
    return new Promise((resolve, reject) => {
      const find = require('local-devices')
      find()
        .then((devices : Array<IDevice>) => {
          resolve(devices)
        })
        .catch((error) => {
          console.log(error)
		  reject(error)
        })
    })
  }

  async dnsReverse(ip: string): Promise<String[]> {
    return new Promise((resolve, reject) => {
      const dns = require('dns')
      dns.reverse(ip, (err, hostnames) => {
        if (err) {
		  console.log(err)
          if (err.code == 'ENOTFOUND') {
            resolve(['IP not found'])
          } else if (err.code == 'EINVAL') {
            resolve(['IP not valid'])
          }
          reject(err)
        }
        resolve(hostnames)
      })
    })
  }

  async dnsLookupService(ip: string, port?: number): Promise<String> {
    return new Promise((resolve, reject) => {
      const dns = require('dns')
      dns.lookupService(ip, port || 8080, (err, hostname, service) => {
        if (err) {
          reject(err)
        }
        resolve(service)
      })
    })
  }
}
