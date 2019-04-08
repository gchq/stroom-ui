import { SwitchedDocRefEditorProps } from "../DocRefEditor";
import FolderExplorer from "../FolderExplorer";
import XsltEditor from "../XsltEditor";
import DictionaryEditor from "../DictionaryEditor";
import PipelineEditor from "../PipelineEditor";
import IndexEditor from "../IndexEditor";
import AnnotationsIndexEditor from "../AnnotationsIndexEditor";
import ElasticIndexEditor from "../ElasticIndexEditor";
import DashboardEditor from "../DashboardEditor";
import ScriptEditor from "../ScriptEditor";
import StroomStatsStoreEditor from "../StroomStatsStoreEditor";
import StatisticStoreEditor from "../StatisticStoreEditor";
import VisualisationEditor from "../VisualisationEditor";
import XMLSchemaEditor from "../XMLSchemaEditor";

export interface DocRefEditorClasses {
  [docRefType: string]: React.FunctionComponent<SwitchedDocRefEditorProps>;
}

export const docRefEditorClasses: DocRefEditorClasses = {
  AnnotationsIndex: AnnotationsIndexEditor,
  ElasticIndex: ElasticIndexEditor,
  Dashboard: DashboardEditor,
  Script: ScriptEditor,
  StroomStatsStore: StroomStatsStoreEditor,
  StatisticStore: StatisticStoreEditor,
  Visualisation: VisualisationEditor,
  XMLSchema: XMLSchemaEditor,
  Folder: FolderExplorer,
  XSLT: XsltEditor,
  DictionaryDoc: DictionaryEditor,
  Pipeline: PipelineEditor,
  Index: IndexEditor,
};
