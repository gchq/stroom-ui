import { SwitchedDocRefEditorProps } from "../DocRefEditor";
import FolderExplorer from "../FolderExplorer";
import XsltEditor from "../XsltEditor";
import DictionaryEditor from "../DictionaryEditor";
import PipelineEditor from "src/components/PipelineEditor";
import IndexEditor from "../IndexEditor";
import AnnotationsIndexEditor from "../AnnotationsIndexEditor";
import ElasticIndexEditor from "../ElasticIndexEditor";
import DashboardEditor from "../DashboardEditor";
import ScriptEditor from "../ScriptEditor";
import StroomStatsStoreEditor from "../StroomStatsStoreEditor";
import StatisticsStoreEditor from "../StatisticsStoreEditor";
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
  StatisticsStore: StatisticsStoreEditor,
  Visualisation: VisualisationEditor,
  XMLSchema: XMLSchemaEditor,
  Folder: FolderExplorer,
  XSLT: XsltEditor,
  Dictionary: DictionaryEditor,
  Pipeline: PipelineEditor,
  Index: IndexEditor
};
