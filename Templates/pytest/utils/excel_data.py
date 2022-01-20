import pandas as pd
import os

class ExcelData(object):
    def __init__(self, file_name):
        self.file_name = file_name
        self.df = pd.read_excel(os.path.join(os.path.join(os.path.dirname(__file__), 'data'), ('{}.xlsx'.format(self.file_name))))
        self.list_desc = []
        self.list_data = self.data_return()


    def excel_body(self, loc):
        df = self.df
        num = 0
        list_body = list()
        list_path = list()
        list_assert = list()
        list_other = list()
        for i in df.loc[:, 'parameter location']:

            if i == 'body':
                list_body.append(num)
            elif i == 'path':
                list_path.append(num)
            elif i == 'assert':
                list_assert.append(num)
            if i == 'other':
                list_other.append(num)
            num += 1
        dict_data = dict()
        dict_data1 = dict()
        dict_path = dict()
        dict_assert = dict()
        list_desc = list()
        for i in df.loc[list_body, ['parameter', loc]].values:
            dict_data[i[0]] = i[1]
        for i in dict_data.keys():
            # print(i)
            p = i.split('.')
            dict_data1[p[1]] = dict_data[i]
        for i in df.loc[list_path, ['parameter', loc]].values:
            dict_path[i[0]] = i[1]

        for i in df.loc[list_assert, ['parameter', loc]].values:
            dict_assert[i[0]] = i[1]

        for i in df.loc[list_other, ['parameter', loc]].values:
            # dict_other[i[0]] = i[1]
            list_desc.append(i[1])
        return dict_data1, dict_path, dict_assert, list_desc

    def data_return(self):
        list_data = []
        for i in self.df.columns[3:]:
            dict_data, dict_path, dict_assert, list_desc = self.excel_body(i)
            list_data.append((dict_data, dict_path, dict_assert))
            # print(list_desc[1])
            self.list_desc.append(list_desc[1])
        return list_data
