import requests
import json
import yaml

yamlPath=''

class ApiTest(object):

    def __init__(self):
        self.response_type = 0  # =1 if response is string
        self.header_print = None  # header
        self.url = None  # url
        self.data_json = None  # parameter json format
        self.response_text = None
        self.response_json = None  
        self.env_dict = yaml.load(yamlPath)
        self.session = requests.session()
        self.header = self.env_dict.env_dicts['header']
        self.api_root_url = self.env_dict.env_dicts['api_root_url']
        self.data = None  # parameter
        self.news = ''

    def get(self, url, **kwargs):
        url = self.api_root_url + url
        self.url = url
        response = self.session.get(url, **kwargs)
        self.header_print = response.headers
        self.header_print = self.header_prints()
        try:
            self.response_type = 0
            self.response_json = json.dumps(response.json(), indent=4, ensure_ascii=False)
        except Exception as e:
            self.response_type = 1
            self.response_json = response.text
        return response

    def post(self, url, data=None, **kwargs):
        url = self.api_root_url + url
        self.url = str(url)
        if data:
            self.data = data
            self.data_json = json.dumps(data, indent=4, ensure_ascii=False)
        else:
            pass
        response = self.session.post(url, data, **kwargs)
        self.response_json = self.response_json = json.dumps(response.json(), indent=4, ensure_ascii=False)
        self.header_print = response.headers
        self.header_print = self.header_prints()
        try:
            self.response_type = 0
            self.response_json = response.json()
        except Exception as e:
            self.response_type = 1
            self.response_text = response.text
        return response

    def options(self, url, **kwargs):
        url = self.api_root_url + url
        self.url = str(url)
        return self.session.options(url, **kwargs)

    def head(self, url, **kwargs):
        url = self.api_root_url + url
        self.url = str(url)
        return self.session.head(url, **kwargs)

    def put(self, url, data=None, **kwargs):
        url = self.api_root_url + url
        self.url = str(url)
        if data:
            self.data = data
            self.data_json = json.dumps(data, indent=4, ensure_ascii=False)
        response = self.session.put(url, data, **kwargs)
        self.response_json = json.dumps(response.json(), indent=4, ensure_ascii=False)
        self.header_print = response.headers
        self.header_print = self.header_prints()
        try:
            self.response_type = 0
            self.response_json = response.json()
        except Exception as e:
            self.response_type = 1
            self.response_text = response.text
        return response

    def patch(self, url, data=None, **kwargs):
        url = self.api_root_url + url
        self.url = str(url)
        if data:
            self.data = data
            self.data_json = json.dumps(data, indent=4, ensure_ascii=False)
        response = self.session.patch(url, data, **kwargs)
        self.response_json = json.dumps(response.json(), indent=4, ensure_ascii=False)
        return response

    def delete(self, url, **kwargs):
        url = self.api_root_url + url
        self.url = str(url)
        response = self.session.delete(url, **kwargs)
        self.response_json = json.dumps(response.json(), indent=4, ensure_ascii=False)

        self.header_print = response.headers
        self.header_print = self.header_prints()
        try:
            self.response_type = 0
            self.response_json = response.json()
        except Exception as e:
            self.response_type = 1
            self.response_text = response.text

    def header_prints(self):
        self.header_printString = ''
        for key, value in dict(self.header_print).items():
            self.header_printString += key + ":" + value + '<br>'
        return self.header_printString

    def request(self, url, method_name, data=None, **kwargs):
        url = self.api_root_url + url
        if method_name == "get":
            return self.session.get(url, **kwargs)
        if method_name == "post":
            return self.session.post(url, data, **kwargs)
        if method_name == "options":
            return self.session.options(url, **kwargs)
        if method_name == "head":
            return self.session.head(url, **kwargs)
        if method_name == "put":
            return self.session.put(url, data, **kwargs)
        if method_name == "patch":
            return self.session.patch(url, data, **kwargs)
        if method_name == "delete":
            return self.session.delete(url, **kwargs)

if __name__ == '__main__':
    pass        